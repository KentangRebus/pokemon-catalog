import { useEffect, useState } from "react";
import {
  Button,
  Col,
  Image,
  Result,
  Row,
  Modal,
  Input,
  Descriptions,
  Badge,
} from "antd";
import { DownloadOutlined, FrownOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import gql from "graphql-tag";

import Title from "antd/lib/typography/Title";

import PdLayout from "../../../components/PdLayout";

import graphClient from "../../../services/graphqlClient";
import { addToPokemonCollection } from "../../../services/pokemonCollection";

export default function Detail() {
  const router = useRouter();
  const { name } = router.query;

  const [pokemon, setPokemon] = useState({});
  const [pokemonNickname, setPokemonNickname] = useState(name);
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("Capture");
  const [showModal, setShowModal] = useState(false);
  const [isCaptured, setIsCaptured] = useState(false);

  useEffect(() => {
    getPokemon(name);
  }, []);

  async function getPokemon(name) {
    try {
      const { data } = await graphClient.query({
        query: gql`
          query {
            pokemon(name: "${name}") {
              id
              name
              sprites {
                front_default
              }
              moves {
                move {
                  name
                }
              }
              types {
                type {
                  name
                }
              }
            }
          }
        `,
      });
      setPokemon(data?.pokemon);
      console.log(data?.pokemon);
    } catch (error) {}
  }

  function handleCatchPokemon() {
    setLoading(true);
    setLoadingText("Capturing...");

    setTimeout(() => {
      let result = Math.ceil(Math.random() * 10);
      let isCatched = result % 2 === 1;
      setIsCaptured(isCatched);
      setShowModal(true);
    }, 800);
  }

  function handleOk() {
    setShowModal(false);
    setLoadingText("Capture");
    setLoading(false);
  }

  function handleCancel() {
    setShowModal(false);
    setLoadingText("Capture");
    setLoading(false);
  }

  function handlePokemonName(e) {
    setPokemonNickname(e.target.value);
  }

  function handleAddToCollection() {
    addToPokemonCollection({ nickname: pokemonNickname, pokemonData: pokemon });
    handleCancel();
  }

  return (
    <PdLayout>
      <Row
        justify='center'
        align='middle'
        style={{ paddingTop: 20 }}
        gutter={[8, 24]}>
        <Col xs={24} style={{ textAlign: "center" }}>
          <Title level={2}>{pokemon?.name}</Title>
        </Col>
        <Col xs={24} style={{ textAlign: "center" }}>
          <Image src={pokemon?.sprites?.front_default} width={130}></Image>
        </Col>
        <Col xs={24} style={{ textAlign: "center" }}>
          <Button
            loading={loading}
            onClick={handleCatchPokemon}
            type='danger'
            shape='round'
            icon={<DownloadOutlined />}
            size='large'>
            {loadingText}
          </Button>
        </Col>
        <Col xs={24} style={{ textAlign: "center" }}>
          <Descriptions title='Pokemon Info' layout='vertical' bordered>
            <Descriptions.Item label='Name'>{pokemon?.name}</Descriptions.Item>
            <Descriptions.Item label='Type'>
              {pokemon?.types?.map((type) => (
                <Badge count={type?.type?.name}></Badge>
              ))}
            </Descriptions.Item>
            <Descriptions.Item label='Moves Info'>
              {pokemon?.moves?.map((move) => (
                <div>
                  {move?.move?.name}
                  <br />
                </div>
              ))}
            </Descriptions.Item>
          </Descriptions>
        </Col>
      </Row>
      <Modal
        visible={showModal}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={false}>
        {isCaptured ? (
          <Result
            status='success'
            title={`Successfully Captured ${pokemon?.name}!`}
            subTitle='Now you can named your pokemon!'
            extra={[
              <Input
                value={pokemonNickname}
                onChange={handlePokemonName}
                placeholder='Enter Pokemon Name'
                style={{ marginBottom: 20 }}
              />,
              <Button
                type='primary'
                key='console'
                onClick={handleAddToCollection}>
                Done
              </Button>,
            ]}
          />
        ) : (
          <Result
            icon={<FrownOutlined />}
            title='Failed to catch, try again!'
          />
        )}
      </Modal>
    </PdLayout>
  );
}
