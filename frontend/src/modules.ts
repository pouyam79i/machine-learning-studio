export interface Block {
  name: String;
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
        },
        {
          name: "Iris Dataset",
        },
      ],
    },
    {
      name: "ML Algorithms",
      blocks: [
        {
          name: "Linear Regression",
        },
        { name: "K-NN" },
        { name: "Random Forest" },
      ],
    },
    {
      name: "Charts",
      blocks: [
        {
          name: "Dot-Line",
        },
      ],
    },
  ],
};

export default modules;
