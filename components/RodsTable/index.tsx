import BootstrapTable from "react-bootstrap-table-next";
// @ts-ignore
import cellEditFactory from "react-bootstrap-table2-editor";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button } from "@mui/material";

import { RodsDataState, HaveSupportsState } from "../../types";
import { TABLE_COLUMNS } from "./constants";
import { Dispatch, SetStateAction } from "react";

interface RodsTableProps {
  rodsDataState: RodsDataState;
  haveSupportsState: HaveSupportsState;
  setIsShowModal: Dispatch<SetStateAction<boolean>>;
}

const RodsTable = ({
  rodsDataState,
  haveSupportsState,
  setIsShowModal,
}: RodsTableProps) => {
  const { isHaveSupports, setIsHaveSupports } = haveSupportsState;
  const { rodsData, setRodsData } = rodsDataState;

  return (
    <div className="preprocessorApp__block mt-5">
      <h4>Стержни конструкции</h4>
      <BootstrapTable
        keyField="id"
        classes="bg-white"
        data={rodsData.map((rod, index) => {
          return { ...rod, indexNumber: ++index };
        })}
        columns={TABLE_COLUMNS}
        cellEdit={cellEditFactory({
          mode: "dbclick",
          afterSaveCell: (
            _oldValue: any,
            newValue: any,
            currentRod: { id: string },
            column: { dataField: any }
          ) => {
            setRodsData(
              rodsData.map((rod) => {
                if (rod.id === currentRod.id) {
                  return { ...rod, [column.dataField]: newValue };
                }
                return rod;
              })
            );
          },
        })}
      />

      <Row>
        <Col>
          <input
            className="form-check-input"
            type="checkbox"
            value={isHaveSupports.supportLeft}
            onChange={() =>
              setIsHaveSupports((prevState) => {
                return {
                  ...prevState,
                  supportLeft: !prevState.supportLeft,
                };
              })
            }
            id="supportLeft"
          />
          <label className="form-check-label mx-3" htmlFor="supportLeft">
            Опора слева
          </label>
          <input
            className="form-check-input"
            type="checkbox"
            value={isHaveSupports.supportRight}
            onChange={() =>
              setIsHaveSupports((prevState) => {
                return {
                  ...prevState,
                  supportRight: !prevState.supportRight,
                };
              })
            }
            id="supportRight"
          />
          <label className="form-check-label mx-3" htmlFor="supportRight">
            Опора справа
          </label>
        </Col>
        <Col className="d-flex justify-content-end">
          <Button onClick={() => setIsShowModal(true)} variant="outlined">
            Сохранить конструкцию
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default RodsTable;
