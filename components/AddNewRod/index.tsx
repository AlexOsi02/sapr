import { useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import { Button } from "@mui/material";

import { INITIAL_STATE } from "./constants";
import { AddNewRodProps } from "./types";

const AddNewRod = ({ rodsDataState }: AddNewRodProps) => {
  const [rodData, setRodData] = useState(INITIAL_STATE);
  const [validated, setValidated] = useState(false);
  const [disabledAddNewRog, setDisabledAddNewRog] = useState(false);

  const { rodsData, setRodsData } = rodsDataState;

  const validateEnterValues = (event: any) => {
    if (
      rodData.rodLength != null &&
      Number(rodData.rodLength) > 0 &&
      rodData.crossSectionalArea != null &&
      rodData.elasticModulus != null &&
      rodData.allowableVoltage != null &&
      rodData.concentratedLoad != null &&
      rodData.linearLoad != null &&
      (rodsData.length === 0 || rodsData[rodsData.length - 1].rodLength > 0)
    ) {
      setRodsData([
        ...rodsData,
        {
          ...rodData,
          id: uuidv4(),
          rodLength: Number(rodData.rodLength),
          crossSectionalArea: Number(rodData.crossSectionalArea),
          elasticModulus: Number(rodData.elasticModulus),
          allowableVoltage: Number(rodData.allowableVoltage),
          concentratedLoad: Number(rodData.concentratedLoad) || 0,
          linearLoad: Number(rodData.linearLoad) || 0,
        },
      ]);
      setRodData(INITIAL_STATE);
      alert("Стержень успешно добавлен");
    } else if (
      rodData.concentratedLoad != null &&
      rodData.rodLength == null &&
      rodData.crossSectionalArea == null &&
      rodData.elasticModulus == null &&
      rodData.allowableVoltage == null &&
      rodData.linearLoad == null &&
      rodsData.length > 0 &&
      rodsData[rodsData.length - 1].rodLength > 0
    ) {
      setRodsData([
        ...rodsData,
        {
          ...rodData,
          id: uuidv4(),
          rodLength: rodData.rodLength,
          crossSectionalArea: rodData.crossSectionalArea,
          elasticModulus: rodData.elasticModulus,
          allowableVoltage: rodData.allowableVoltage,
          concentratedLoad: Number(rodData.concentratedLoad) || 0,
          linearLoad: rodData.linearLoad || 0,
        },
      ]);
      setDisabledAddNewRog(true);
      setRodData(INITIAL_STATE);
      alert("Последний стержень успешно добавлен");
    } else {
      event.preventDefault();
      alert("Неправильно введены обязательные поля");
    }
  };

  const handleSaveRodData = (event: any) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity()) {
      event.stopPropagation();
      validateEnterValues(event);
      setValidated(false);
    } else {
      setValidated(true);
    }
  };

  const handleDeleteRodData = (event: any) => {
    event.preventDefault();
    setRodData(INITIAL_STATE);
  };

  return (
    <>
      <h4>Добавление нового стержня</h4>
      <Form noValidate validated={validated} onSubmit={handleSaveRodData}>
        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="rod-length">
            <Form.Control
              type="number"
              placeholder="Длина стержня (L)"
              value={rodData.rodLength != null ? rodData.rodLength : ""}
              aria-describedby="rod-lenght"
              onChange={(event) =>
                setRodData((prevState) => {
                  return {
                    ...prevState,
                    rodLength: event.target.value,
                  };
                })
              }
            />
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="cross-sectional-area">
            <Form.Control
              type="number"
              placeholder="Площадь поперечного сечения (A)"
              value={
                rodData.crossSectionalArea != null
                  ? rodData.crossSectionalArea
                  : ""
              }
              aria-describedby="cross-sectional-area"
              onChange={(event) =>
                setRodData((prevState) => {
                  return {
                    ...prevState,
                    crossSectionalArea: event.target.value,
                  };
                })
              }
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="elastic-modulus">
            <Form.Control
              type="number"
              placeholder="Модуль упругости (E)"
              value={
                rodData.elasticModulus != null ? rodData.elasticModulus : ""
              }
              aria-describedby="elastic-modulus"
              onChange={(event) =>
                setRodData((prevState) => {
                  return {
                    ...prevState,
                    elasticModulus: event.target.value,
                  };
                })
              }
            />
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="allowable-voltage">
            <Form.Control
              type="number"
              placeholder="Допускаемое напряжение (σ)"
              aria-describedby="allowable-voltage"
              value={
                rodData.allowableVoltage != null ? rodData.allowableVoltage : ""
              }
              onChange={(event) =>
                setRodData((prevState) => {
                  return {
                    ...prevState,
                    allowableVoltage: event.target.value,
                  };
                })
              }
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="concentrated-load">
            <Form.Control
              type="number"
              placeholder="Сосредоточенная нагрузка (F)"
              value={
                rodData.concentratedLoad != null ? rodData.concentratedLoad : ""
              }
              onChange={(event) =>
                setRodData((prevState) => {
                  return {
                    ...prevState,
                    concentratedLoad: event.target.value,
                  };
                })
              }
              aria-describedby="concentrated-load"
              required
            />
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="linear-load">
            <Form.Control
              type="number"
              placeholder="Погонная нагрузка (Q)"
              value={rodData.linearLoad != null ? rodData.linearLoad : ""}
              onChange={(event) =>
                setRodData((prevState) => {
                  return {
                    ...prevState,
                    linearLoad: event.target.value,
                  };
                })
              }
              aria-describedby="linear-load"
            />
          </Form.Group>
        </Row>

        <div className="d-flex mt-4 justify-content-start">
          <Button
            className="btn btn-danger me-3"
            onClick={(event) => handleDeleteRodData(event)}
          >
            Очистить
          </Button>
          <Button
            type="submit"
            className="btn btn-success"
            disabled={disabledAddNewRog}
          >
            Добавить
          </Button>
        </div>
      </Form>
    </>
  );
};

export default AddNewRod;
