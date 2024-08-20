import { Entity } from "electrodb"; // ORM - object relational mapping
import { client } from "../util/dbconnection.js";

const User = new Entity(
  {
    model: {
      entity: "User",
      version: "1",
      service: "UserService",
    },
    attributes: {
      username: {
        type: "string",
      },
      password: {
        type: "string",
      },
    },
    indexes: {
      primary: {
        pk: {
          // highlight-next-line
          field: "pk",
          facets: ["username"],
        },
        sk: {
          // highlight-next-line
          field: "sk",
          facets: [],
        },
      },
    },
  },
  { client, table: "user" }
);

export { User };
