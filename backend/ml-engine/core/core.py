from typing import Dict

class core:

    def simple_execute(self, code:str):
        exec(code)
        return True
    
    def __call__(self, input:Dict[str, str]):
        if input['exec']=='simple':
            return self.simple_execute(input['code'])
            
        return False