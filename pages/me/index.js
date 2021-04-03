import PdLayout from "../../components/PdLayout";
import { Button, Col, Image, Popconfirm, Row } from "antd";
import Title from "antd/lib/typography/Title";
import { useState, useEffect } from "react";
import {
  getPokemonCollection,
  removePokemon,
} from "../../services/pokemonCollection";

export default function Me() {
  const [pokemons, setPokemons] = useState({});

  useEffect(() => {
    setPokemons(getPokemonCollection());
  }, []);

  function handleReleasePokemon(name) {
    removePokemon(name);
    setPokemons(getPokemonCollection());
  }

  return (
    <PdLayout>
      <Row justify='center' align='middle'>
        <Col xs={23} style={{ paddingTop: 10 }}>
          <Title level={3} style={{ textAlign: "center" }}>
            My Pokemon List
          </Title>
        </Col>
        {Object.entries(pokemons).map(([key, value]) => (
          <Col
            key={value?.origin?.id}
            xs={24 / 3}
            lg={24 / 6}
            style={{ textAlign: "center" }}>
            <Image src={value?.origin?.sprites?.front_default} />
            <Title level={5} ellipsis>
              {value?.nickname}
            </Title>
            <Popconfirm
              title={`Are you sure to release ${value?.nickname}?`}
              onConfirm={handleReleasePokemon.bind(this, value?.origin?.name)}
              okText='Yes'
              cancelText='No'>
              <Button ghost type='danger'>
                Release
              </Button>
            </Popconfirm>
          </Col>
        ))}
      </Row>
    </PdLayout>
  );
}
