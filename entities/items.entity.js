import { Entity } from "electrodb"; // ORM(Object relation mapping) // Adapter on adapter

import { client } from "../util/dbconnection.js";

const Items = new Entity(
  {
    model: {
      entity: "Items",
      version: "1",
      service: "itemService",
    },
    attributes: {
      id: {
        type: "string",
      },
      name: {
        type: "string",
      },
      price: {
        type: "number",
      },
      location: {
        type: "string",
      },
      description: {
        type: "string",
      },
      banner_img: {
        type: "string",
      },
      cover_img: {
        type: "string",
      },
    },
    indexes: {
      primary: {
        pk: {
          // highlight-next-line
          field: "pk",
          facets: ["id"],
        },
        sk: {
          // highlight-next-line
          field: "sk",
          facets: [],
        },
      },
    },
  },
  { client, table: "items" }
);

export { Items };
