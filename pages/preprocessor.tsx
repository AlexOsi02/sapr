import Typography from "@mui/material/Typography";
import Link from "next/link";
import Head from "next/head";
import { useEffect, useState } from "react";
import Image from "next/image";
import Form from "react-bootstrap/Form";

import AddNewRod from "../components/AddNewRod";
import supportLeftIcon from "../public/supportLeft.png";
import supportRightIcon from "../public/supportRight.png";
import arrowLeft from "../public/arrowLeft.png";
import arrowRight from "../public/arrowRight.png";
import arrowLongRight from "../public/arrowLongRight.png";
import arrowLongLeft from "../public/arrowLongLeft.png";

import { Rod } from "../types";
import { Button, Container } from "@mui/material";
import RodsTable from "../components/RodsTable";
import { InputGroup, Modal } from "react-bootstrap";

const Preprocessor = () => {
  const [rodsData, setRodsData] = useState<Rod[]>([]);
  const [isHaveSupports, setIsHaveSupports] = useState({
    supportLeft: false,
    supportRight: false,
  });
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const [constructionName, setConstructionName] = useState("");

  const showVisualization = rodsData.length > 0 ? {} : { display: "none" };

  const visualizeStructure = () => {
    let canvas: any;
    let ctx;
    canvas = document?.getElementById("canvas");
    ctx = canvas?.getContext("2d");

    // @ts-ignore
    canvas.width = 1900;
    // @ts-ignore
    canvas.height = 600;
    ctx?.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    if (canvas?.getContext) {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      let width = 0;
      let widthOfFirst = 1000 - 10;
      let heightOfFirst = 500 - 10;
      let currentHeight = 0;
      let totalLengthL = 0;
      for (let r = 0; r < rodsData.length; r++) {
        totalLengthL += Number(rodsData[r].rodLength);
      }
      let totalSquareA = 0;
      for (let r = 0; r < rodsData.length; r++) {
        if (totalSquareA < rodsData[r].crossSectionalArea) {
          totalSquareA = rodsData[r].crossSectionalArea;
        }
      }
      let coefL = 0;
      let coefA = 0;
      coefL = (widthOfFirst - 40) / totalLengthL;
      coefA = (heightOfFirst - 40) / totalSquareA;

      let supportLeft = document.getElementById("supportLeftIcon");
      let supportRight = document.getElementById("supportRightIcon");
      let arrowLeft = document.getElementById("arrowLeft");
      let arrowRight = document.getElementById("arrowRight");

      let arrowLongRight = document.getElementById("arrowLongRight");
      let arrowLongLeft = document.getElementById("arrowLongLeft");
      let maxHeight = 0;

      let X = 50;
      let Y = 70;
      let startX = X + 20;
      var endX = 0;
      var endY = 0;

      for (let r = 0; r < rodsData.length; r++) {
        width = rodsData[r].rodLength * coefL;
        currentHeight = rodsData[r].crossSectionalArea * coefA;

        if (currentHeight > maxHeight) {
          maxHeight = currentHeight;
        }

        endX = X;
        endY = Y;

        var widthF = 20;
        var heightF = 70;

        if (!rodsData[r].rodLength || !rodsData[r].crossSectionalArea) {
          if (r != rodsData.length - 1) {
            alert("Ошибка! Длина или площадь стержня равна нулю!");
            return;
          }
        } else {
          let xOfFirst = 50;
          let yOfFirst = 50;
          X = widthOfFirst;
          let xQ = startX;
          let widthQ = 30;
          let heightQ = 15;
          ctx.strokeRect(
            startX,
            yOfFirst + heightOfFirst / 2 - currentHeight / 2,
            width,
            currentHeight
          );
          startX += width;

          if (rodsData[r].concentratedLoad > 0) {
            ctx.drawImage(
              arrowLongRight,
              xQ,
              yOfFirst + heightOfFirst / 2 - currentHeight / 3 / 2,
              width / 2,
              currentHeight / 3
            );
          } else if (rodsData[r].concentratedLoad < 0 && r > 0) {
            ctx.drawImage(
              arrowLongLeft,
              xQ - (rodsData[r - 1].rodLength * coefL) / 2,
              yOfFirst +
                heightOfFirst / 2 -
                (rodsData[r - 1].crossSectionalArea * coefA) / 3 / 2,
              (rodsData[r - 1].rodLength * coefL) / 2,
              (rodsData[r - 1].crossSectionalArea * coefA) / 3
            );
          }

          if (rodsData[r].linearLoad > 0) {
            do {
              ctx.drawImage(
                arrowRight,
                xQ,
                yOfFirst + heightOfFirst / 2 - heightQ / 2,
                widthQ,
                heightQ
              );
              xQ += widthQ;
            } while (xQ + widthQ <= startX);
          } else if (rodsData[r].linearLoad < 0) {
            do {
              ctx.drawImage(
                arrowLeft,
                xQ,
                yOfFirst + heightOfFirst / 2 - heightQ / 2,
                widthQ,
                heightQ
              );
              xQ += widthQ;
            } while (xQ + widthQ <= startX);
          }

          let endOfFirst = widthOfFirst + 30;

          if (isHaveSupports.supportLeft) {
            ctx.drawImage(
              supportLeft,
              xOfFirst,
              yOfFirst + heightOfFirst / 2 - heightF / 2,
              widthF,
              heightF
            );
          }

          if (isHaveSupports.supportRight) {
            ctx.drawImage(
              supportRight,
              endOfFirst,
              yOfFirst + heightOfFirst / 2 - heightF / 2,
              widthF,
              heightF
            );
          }
        }
      }
    }
  };

  const handleSaveConstruction = () => {
    localStorage.setItem(
      `construction.${constructionName}`,
      JSON.stringify({
        rodsData,
        leftLimit: isHaveSupports.supportLeft,
        rightLimit: isHaveSupports.supportRight,
      })
    );
    setRodsData([]);
    setIsShowModal(false);
  };

  useEffect(() => {
    visualizeStructure();
  }, [rodsData, isHaveSupports]);

  return (
    <>
      <Head>
        <title>Препроцессор</title>
        <meta name="description" content="processor" />
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
          Препроцессор
        </Typography>
      </header>
      <Container component="main" className="mt-3">
        <Modal show={isShowModal} onHide={() => setIsShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Введите наименование конструкции</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <InputGroup>
              <Form.Control
                autoFocus
                onChange={(event) => setConstructionName(event.target.value)}
              />
            </InputGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button color="secondary" onClick={() => setIsShowModal(false)}>
              Закрыть
            </Button>
            <Button
              color="primary"
              onClick={handleSaveConstruction}
              disabled={!constructionName}
            >
              Сохранить
            </Button>
          </Modal.Footer>
        </Modal>

        <AddNewRod rodsDataState={{ rodsData, setRodsData }} />
        {rodsData.length > 0 ? (
          <RodsTable
            rodsDataState={{ rodsData, setRodsData }}
            haveSupportsState={{ isHaveSupports, setIsHaveSupports }}
            setIsShowModal={setIsShowModal}
          />
        ) : null}
        <div className="my-5 overflow-scroll" style={showVisualization}>
          <Image
            id="supportLeftIcon"
            alt="supportLeftIcon"
            src={supportLeftIcon}
            style={{ display: "none" }}
            priority
          />
          <Image
            id="supportRightIcon"
            alt="supportRightIcon"
            src={supportRightIcon}
            style={{ display: "none" }}
            priority
          />
          <Image
            id="arrowLeft"
            alt="arrowLeft"
            src={arrowLeft}
            style={{ display: "none" }}
            priority
          />
          <Image
            id="arrowRight"
            alt="arrowRight"
            src={arrowRight}
            style={{ display: "none" }}
            priority
          />
          <Image
            id="arrowLongRight"
            alt="arrowLongRight"
            src={arrowLongRight}
            style={{ display: "none" }}
            priority
          />
          <Image
            id="arrowLongLeft"
            alt="arrowLongLeft"
            src={arrowLongLeft}
            style={{ display: "none" }}
            priority
          />

          <canvas id="canvas" height="0"></canvas>
        </div>
      </Container>
    </>
  );
};

export default Preprocessor;
