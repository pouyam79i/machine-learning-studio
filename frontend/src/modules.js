/**
 * Modules contains every tools needed in this project.
 *
 * Modules contains{
 *  items: [
 *    {id: integer,
 *    title: string,
 *    tags: string,
 *    props: null or [
 *        {
 *          id: integer,
 *          title: string,
 *          tag: string,
 *          type: string -> contain type of component used in props
 *        },
 *      ],
 *     items: null or [
 *       // sub items with same structure.
 *     ]
 *   },
 * ],
 * // other configurations
 *}
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
 *  }]
 *   items: null or [
 *  // sub items with same structure.
 * ]
 * }
 * ]; }}
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
              title: "Address",
              tag: "address",
              type: "text-field",
            },
            {
              id: 1,
              title: "Features",
              tag: "features",
              type: "text-field",
            },
            {
              id: 2,
              title: "Targets",
              tag: "targets",
              type: "text-field",
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
                  title: "Learn more about iris dataset",
                  tag: "description",
                  type: "description",
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
      tag: "ml_algorithms",
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
              title: "Learn more about k-nn",
              tag: "description",
              type: "description",
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
              title: "Learn more about linear regression",
              tag: "description",
              type: "description",
            },
          ],
          items: null,
        },
      ],
    },

    // last item id: 6
  ],
};

export default Modules;
