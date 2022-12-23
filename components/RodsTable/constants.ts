import { isNaNValidate } from "./utils";

export const TABLE_COLUMNS = [
  {
    dataField: "indexNumber",
    text: "№",
    editable: false,
  },
  {
    dataField: "rodLength",
    text: "Длина стержня (L)",
    editable: true,
    validator: (newValue: number) => isNaNValidate(newValue),
  },
  {
    dataField: "crossSectionalArea",
    text: "Площадь поперечного сечения (A)",
    editable: true,
    validator: (newValue: number) => isNaNValidate(newValue),
  },
  {
    dataField: "elasticModulus",
    text: "Модуль упругости (E)",
    editable: true,

    validator: (newValue: number) => isNaNValidate(newValue),
  },
  {
    dataField: "allowableVoltage",
    text: "Допускаемое напряжение (σ)",
    editable: true,

    validator: (newValue: number) => isNaNValidate(newValue),
  },
  {
    dataField: "concentratedLoad",
    text: "Сосредоточенная нагрузка (F)",
    editable: true,

    validator: (newValue: number) => isNaNValidate(newValue),
  },
  {
    dataField: "linearLoad",
    text: "Погонная нагрузка (Q)",
    editable: true,

    validator: (newValue: number) => isNaNValidate(newValue),
  },
];
