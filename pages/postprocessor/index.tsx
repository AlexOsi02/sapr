import { useEffect, useState } from "react";
import Head from "next/head";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { Table } from "react-bootstrap";
import { Button } from "@mui/material";

import { getConstructionsFromLocalStorage } from "../../utils";
import {ConstructionQuery} from "../../types";

const Index = () => {
  const [constructions, setConstructions] = useState<ConstructionQuery[]>([]);

  useEffect(() => setConstructions(getConstructionsFromLocalStorage()), []);
  return (
    <>
      <Head>
        <title>Постпроцессор</title>
        <meta name="description" content="postprocessor" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="d-flex align-items-center bg-secondary">
        <Typography
          variant="h1"
          className="fs-1 fw-bold p-3 bg-secondary text-bg-info"
        >
          <Link href="/">Turbo-Sapr</Link>
        </Typography>
        <Typography variant="h2" className="ms-5 fs-3 text-info">
          Постпроцессор
        </Typography>
      </header>
      <main className="p-4">
        <Table className="bg-white">
          <thead>
            <tr>
              <th>№</th>
              <th>Название</th>
              <th />
              <th />
            </tr>
          </thead>
          <tbody>
            {constructions.map(({ name: constructionName }, index) => (
              <tr key={constructionName}>
                <td>{++index}</td>
                <td>{constructionName?.replace("construction.", "")}</td>
                <td className="text-end">
                  <Link
                    href={`/postprocessor/${constructionName}`}
                  >
                  <Button>Рассчитать</Button>
                  </Link>

                </td>
                <td className="text-end">
                    <Button>Редактировать</Button>
                </td>
                <td className="text-end">
                  <Button
                    color="error"
                    onClick={() => {
                      setConstructions(
                        constructions.filter(
                          ({ name }) => name !== constructionName
                        )
                      );
                      localStorage.removeItem(constructionName);
                    }}
                  >
                    Удалить
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </main>
    </>
  );
};

export default Index;
