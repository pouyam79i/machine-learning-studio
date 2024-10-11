import unittest
import json
from core_interpreter import interpreter

BASE_INPUT_LOCATION = './input/'
BASE_RES_LOCATION = './input/'

class TestCore(unittest.TestCase):
    
    def load_input_file(self, filename):
        try:
            with open(BASE_INPUT_LOCATION+filename+'.json', 'r') as file:
                data = json.load(file)
                print(data)
                return data
        except FileNotFoundError:
            print(f"The file {filename} does not exist.")
        except json.JSONDecodeError:
            print(f"Error decoding JSON from the file {filename}.")
        except Exception as e:
            print(f"An error occurred: {e}")
    
    def load_result(self, name):
        pass

    # test linear regression
    def test_true_linear_regression_1(self):
        obj_input_data = self.load_input_file('true_linear_regression_1')
        interpreter = interpreter()
        generated_code = interpreter(obj_input_data)
        true_result = self.load_result('linear_regression')
        

    # test knn
    def test_knn(self):
        pass

if __name__ == '__main__':
    unittest.main(verbosity=2)
