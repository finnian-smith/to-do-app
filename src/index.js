import "../src/styles/main.css";
import { initialiseDatePicker } from "../src/logic/date-picker.js";
import { renderProjectList, renderTodoList } from "./dom.js";

renderProjectList();
renderTodoList();

initialiseDatePicker();
