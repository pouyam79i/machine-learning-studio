from typing import Dict

class core:

    def simple_execute(self, code:str):
        print('before exec:')
        try:
            exec(code)
        except KeyError:
            print('key error')
        except:
            print('any error')
        return True
    
    def __call__(self, input:str):
        return self.simple_execute(input)
