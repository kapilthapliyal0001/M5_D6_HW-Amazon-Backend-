import fs from "fs-extra";
import {fileURLToPath} from "url";
import {dirname, join} from "path";

const {readJSON, writeJSON, writeFile} = fs;

const usersPublicFolderPath = join(
  dirname(fileURLToPath(import.meta.url)),
  "../../public/img/products"
);

export const writeUsersPicture = (fileName, content) =>
  writeFile(join(usersPublicFolderPath, fileName), content);
