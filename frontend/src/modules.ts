interface field {
  id: string;
  title: string;
  tag: string;
}

export interface BlockProps {
  fields: field[];
}

export interface Block {
  name: String;
  props: BlockProps | null;
}

export interface Tool {
  name: String;
  blocks: Block[];
}

export interface Modules {
  tools: Tool[];
}

const modules: Modules = {
  tools: [
    {
      name: "Import Dataset",
      blocks: [
        {
          name: "Import CSV",
          props: {
            fields: [
              {
                id: "0",
                title: "Address",
                tag: "addr",
              },
              {
                id: "1",
                title: "Features",
                tag: "features",
              },
              {
                id: "2",
                title: "Targets",
                tag: "targets",
              },
            ],
          },
        },
        {
          name: "Iris Dataset",
          props: null,
        },
      ],
    },
    {
      name: "ML Algorithms",
      blocks: [
        {
          name: "Linear Regression",
          props: null,
        },
        { name: "K-NN", props: null },
        // { name: "Random Forest", props: null },
      ],
    },
    {
      name: "Charts",
      blocks: [
        {
          name: "Dot-Line",
          props: null,
        },
      ],
    },
  ],
};

export default modules;
