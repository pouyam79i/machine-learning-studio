import unittest
from core_interpreter import core

class TestCore(unittest.TestCase):
    
    # testing empty module
    def test_empty(self):
        # 1- give a full empty nodes and edges array
        # 2 -give some edges but no nodes
        
        # self.assertEqual(core(data in json, res in text))
        pass

    def test_linear_reg():
        # give it same flow in different orders for linear regression
        pass

    def test_knn():
        # give it same flow in different orders for knn
        pass


if __name__ == '__main__':
    unittest.main()
