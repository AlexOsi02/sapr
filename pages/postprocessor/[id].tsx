import Head from "next/head";
import {useRouter} from "next/router";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import {useEffect, useState} from "react";

import {calculateData, getConstructionsFromLocalStorage, xsCalc} from "../../utils";
import {ConstructionQuery} from "../../types";
import {Table} from "react-bootstrap";

const Id = () => {
  const [constructions, setConstructions] = useState<ConstructionQuery[]>([]);
  const [selectedConstruction, setSelectedConstruction] = useState<ConstructionQuery>();

  const {query: {id}} = useRouter();

  useEffect(() => {
    setConstructions(getConstructionsFromLocalStorage());
  }, []);

  useEffect(() => {
    setSelectedConstruction(constructions?.find(({name}) => name === id));
  }, [constructions])

  // console.log('selectedConstruction', selectedConstruction)
  // console.log('calc', calculateData(selectedConstruction?.construction))
  // console.log('xsCalc', xsCalc(selectedConstruction?.construction.rodsData))
  // console.log('delta', calculateData(selectedConstruction?.construction)?.delta)

  return (
    <>
      <Head>
        <title>Рассчет значений</title>
        <meta name="description" content="postprocessorValue" />
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
          {`Рассчет значений для конструкции - ${typeof id === 'string' && id?.replace("construction.", "")}`}
        </Typography>
      </header>
      <main className="p-4">
        {xsCalc(selectedConstruction?.construction.rodsData)?.map((xsArr, index) => (
          <Table key={index}>
            <thead>
            <tr>
              <th>{`Стержень ${++index}`}</th>
              {xsArr.map((value) => (
                <th key={value}>{value}</th>
              ))}
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>N</td>
              {calculateData(selectedConstruction?.construction)?.N?.[--index]?.map((value) =>(
                  <td key={value}>{value}</td>
              ))}
            </tr>
            <tr>
              <td>U</td>
              {calculateData(selectedConstruction?.construction)?.U?.[index]?.map((value) =>(
                <td key={value}>{value}</td>
              ))}
            </tr>
            <tr>
              <td>σ</td>
              {calculateData(selectedConstruction?.construction)?.S?.[index]?.map((value) =>(
                <td key={value}>{value}</td>
              ))}
            </tr>
            </tbody>
          </Table>
        ))}

      </main>
    </>
  )
}

export default Id;