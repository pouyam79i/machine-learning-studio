import unittest
import json
import sys
import os

parent_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
sys.path.insert(0, parent_dir)

from core import core

BASE_INPUT_LOCATION = './test/input/'
BASE_RES_LOCATION = './test/results/'

class TestCore(unittest.TestCase):
    
    # loading test
    def load_input_file(self, filename):
        with open(BASE_INPUT_LOCATION+filename+'.json', 'r') as file:
            data = json.load(file)
            file.close()
            output = {}
            output['data'] = json.dumps(data)
            output['user_hash'] = ''
            return output
        
    # loading result
    def load_result(self, filename):
        try:
            with open(BASE_RES_LOCATION+filename+'.txt', 'r') as file:
                file_content = file.read()
                file.close()
                return file_content
        except FileNotFoundError:
            print("The file does not exist.")
        except Exception as e:
            print("An error occurred:", e)
            
    # TEST AREA ******************************************************************************************************

    # test linear regression 
    def test_linear_regression(self):
        obj_input_data = self.load_input_file('linear_regression')
        interpreter = core()
        generated_code = interpreter(obj_input_data)
        true_result = self.load_result('linear_regression')
        self.assertEqual(generated_code.strip(), true_result.strip(), 'linear_regression generated code is not as expected!')

    # test knn
    def test_knn(self):
        obj_input_data = self.load_input_file('knn')
        interpreter = core()
        generated_code = interpreter(obj_input_data)
        true_result = self.load_result('knn')
        self.assertEqual(generated_code.strip(), true_result.strip(), 'knn generated code is not as expected!')

if __name__ == '__main__':
    unittest.main(verbosity=2)
