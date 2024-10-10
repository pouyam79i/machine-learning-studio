/**
 * Modules contains every tools needed in this project.
 *
 * @type {{ items: [{
 *  id: number,
 *  title: string,
 *  tags: string,
 *  props: null or [{
 *   id: number,
 *   title: string,
 *   tag: string,
 *   type: string
 *  },]
 *   items: null or [Item]
 * }];
 *  }}
 */
const Modules = {
  items: [
    {
      id: 0,
      title: "Import Dataset",
      tag: "import",
      props: null,
      items: [
        {
          id: 1,
          title: "Import CSV",
          tag: "csv",
          props: [
            {
              id: 0,
              title: "DB Name",
              tag: "db_name",
              type: "text-field",
              data: "",
            },
            {
              id: 1,
              title: "Features",
              tag: "X",
              type: "text-field",
              data: "",
            },
            {
              id: 2,
              title: "Targets",
              tag: "y",
              type: "text-field",
              data: "",
            },
            {
              id: 3,
              title: "Test Portion",
              tag: "test_portion",
              type: "text-field",
              data: "0.2",
            },
          ],
          items: null,
        },
        {
          id: 2,
          title: "Existing Datasets",
          tag: "existing_dataset",
          props: null,
          items: [
            {
              id: 3,
              title: "Iris Dataset",
              tag: "iris",
              props: [
                {
                  id: 0,
                  title: "Test Portion",
                  tag: "test_portion",
                  type: "text-field",
                  data: "0.2",
                },
                {
                  id: 1,
                  title: "Learn more about iris dataset",
                  tag: "description",
                  type: "description",
                  href: "iris-des",
                },
              ],
              items: null,
            },
          ],
        },
      ],
    },
    {
      id: 4,
      title: "ML Algorithms",
      tag: "ml",
      props: null,
      items: [
        {
          id: 5,
          title: "Linear Regression",
          tag: "linear_regression",
          props: [
            {
              id: 0,
              title: "Learn more about linear regression",
              tag: "description",
              type: "description",
              href: "linear-reg-des",
            },
          ],
          items: null,
        },
        {
          id: 6,
          title: "K-NN",
          tag: "knn",
          props: [
            {
              id: 0,
              title: "Number of neighbors...",
              tag: "neighbors",
              type: "text-field",
              data: "3",
            },
            {
              id: 1,
              title: "Learn more about k-nn",
              tag: "description",
              type: "description",
              href: "knn-des",
            },
          ],
          items: null,
        },
      ],
    },
    {
      id: 7,
      title: "Charts",
      tag: "charts",
      props: null,
      items: [
        {
          id: 8,
          title: "Line Graph",
          tag: "line_graph",
          props: [
            {
              id: 0,
              title: "What is Line Graph?",
              tag: "description",
              type: "description",
              href: "line-graph-des",
            },
          ],
          items: null,
        },
        {
          id: 9,
          title: "Decision Boundary",
          tag: "decision_boundary",
          props: [
            {
              id: 0,
              title: "What is Decision Boundary?",
              tag: "description",
              type: "description",
              href: "decision-boundary-plot-des",
            },
          ],
          items: null,
        },
      ],
    },

    // last item id: 9
  ],
};

// This is a local offline data set for descriptions!
// TODO: replace this with and api call but define it inside descriptions component
const Descriptions = {
  "iris-des":
    "The Iris flower data set or Fisher's Iris data set is a multivariate data set used and made famous by the British statistician and biologist Ronald Fisher in his 1936 paper The use of multiple measurements in taxonomic problems as an example of linear discriminant analysis.",
  "linear-reg-des":
    "Linear regression is an algorithm that provides a linear relationship between an independent variable and a dependent variable to predict the outcome of future events. It is a statistical method used in data science and machine learning for predictive analysis.",
  "knn-des":
    "In statistics, the k-nearest neighbors algorithm is a non-parametric supervised learning method first developed by Evelyn Fix and Joseph Hodges in 1951, and later expanded by Thomas Cover. It is used for classification and regression. In both cases, the input consists of the k closest training examples in a data set.",
  "line-graph-des":
    "In the mathematical discipline of graph theory, the line graph of an undirected graph G is another graph L(G) that represents the adjacencies between edges of G. L(G) is constructed in the following way: for each edge in G, make a vertex in L(G); for every two edges in G that have a vertex in common, make an edge between their corresponding vertices in L(G).",
  "decision-boundary-plot-des":
    "A decision boundary/surface is a plot that shows how a trained model makes its predictions according to a feature space.",
};

export const getDescriptions = (href) => {
  let data = Descriptions[href];
  if (data) {
    data = data.trim();
    if (data.length > 400) {
      data = data.slice(0, 400) + "...";
    }
    return data;
  }
  return "No description was found!";
};

export default Modules;

// items = [
//   //item 1 - this is an item
//   {
//     ...data,
//     props: [prop1, prop2],
//     items: null,
//   },
//   // item 2 - this is a menu
//   {
//     ...data,
//     props: null,
//     items: [sub_item1, sub_item2],
//   },
// ];
