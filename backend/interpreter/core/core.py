from typing import Dict, List
import heapq

class core():

    # use to get import component code
    def selector_import(self, type:str) -> str:
        module = {
            'csv':'import-csv.py'
        }
        f = open("./modules/import/"+module[type], "r")
        return f.read()
        
    # use to get machine learning component code
    def selector_ml(self, type:str) -> str:
        module = {
            'lin-reg':'lin-reg.py'
        }
        f = open("./modules/ml/"+module[type], "r")
        return f.read()

    # use to get display component code
    def selector_display(self, type:str) -> str:
        module = {
            'dot-line':'dot-line.py'
        }
        f = open("./modules/display/"+module[type], "r")
        return f.read()

    # build a file
    def simple_build(self, components:List[Dict[str, str]]):
        
        heap = []
        heapq.heapify(heap)
        priority = 0
        
        for item in components:
            code = ''
            type = item['type']
            if type.startswith('import'):
                priority = 0
                code = self.selector_import(type.removeprefix('import-'))
            elif type.startswith('ml'):
                priority = 1
                code = self.selector_import(type.removeprefix('ml-'))
            elif type.startswith('display'):
                priority = 2 
                code = self.selector_import(type.removeprefix('display-'))
            heapq.heappush((priority, code))
                
        output = ''
        while len(heap) > 0:
            code = heapq.heappop(heap)
            output += code + '\n'
        
        return output
            

    # returns useable code after analyzing the user request
    def run(self, input:dict)->str:
        if input['type'] == 'simple-build':
            return self.simple_build(input['components'])
        
        return ''

    # another way to call run
    def __call__(self, input:dict):
        self.run(input)