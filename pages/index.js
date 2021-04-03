import { Col, Image, Pagination, Row } from "antd";
import Title from "antd/lib/typography/Title";
import gql from "graphql-tag";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useState } from "react";
import PdLayout from "../components/PdLayout";
import graphClient from "../services/graphqlClient";
import { getPokemonCollection } from "../services/pokemonCollection";

export default function Home(results) {
  const [pokemonState, setPokemonState] = useState(results?.pokemons);
  const [pokemons, setPokemons] = useState(pokemonState?.results);
  const [localCollection, setLocalCollection] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  const router = useRouter();

  useEffect(() => {
    setLocalCollection(getPokemonCollection());
  }, []);

  async function getPokemonOnPage({ page, offset }) {
    try {
      const { data } = await graphClient.query({
        query: gql`
          query {
            pokemons(limit: 12, offset: ${(page - 1) * 12}) {
              count
              next
              previous
              nextOffset
              prevOffset
              status
              message
              results {
                id
                url
                name
                image
              }
            }
          }
        `,
      });
      setPokemons(data?.pokemons?.results);
      setPokemonState(data?.pokemons);
      setCurrentPage(page);
    } catch (error) {}
  }

  function handlePagination(page, pageSize) {
    getPokemonOnPage({
      page: page,
      offset:
        page < currentPage
          ? pokemonState?.prevOffset
          : pokemonState?.nextOffset,
    });
  }

  function handlePokemonDetail(name) {
    router.push(`/detail/${name}`);
  }

  return (
    <PdLayout>
      <Row justify='center' align='middle'>
        <Col xs={23} style={{ paddingTop: 10 }}>
          <Title level={3} style={{ textAlign: "center" }}>
            {Object.entries(localCollection).length} / {pokemonState?.count}
          </Title>
        </Col>
        {pokemons.map((pokemon) => (
          <Col
            key={pokemon.id}
            xs={24 / 3}
            lg={24 / 6}
            style={{ textAlign: "center" }}
            onClick={handlePokemonDetail.bind(this, pokemon.name)}>
            <Image src={pokemon?.image} preview={false} />
            <Title level={5} ellipsis>
              {pokemon?.name}
            </Title>
          </Col>
        ))}
      </Row>
      <Row align='middle' justify='center' style={{ marginTop: 40 }}>
        <Col>
          <Pagination
            current={currentPage}
            defaultPageSize={12}
            pageSizeOptions={[""]}
            showLessItems
            total={pokemonState?.count}
            onChange={handlePagination}
          />
        </Col>
      </Row>
    </PdLayout>
  );
}

export async function getStaticProps() {
  const { data } = await graphClient.query({
    query: gql`
      query {
        pokemons(limit: 12, offset: 0) {
          count
          next
          previous
          nextOffset
          prevOffset
          status
          message
          results {
            id
            url
            name
            image
          }
        }
      }
    `,
  });

  return {
    props: {
      pokemons: data?.pokemons,
    },
  };
}
