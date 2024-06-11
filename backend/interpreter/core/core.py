from typing import Dict, List
import heapq
import os

BASE_ADDR = "./core/modules/"

class core():

    # use to get import component code
    def selector_import(self, type:str) -> str:
        print("import got:"+ type )
        module = {
            'csv':'import-csv.py'
        }
        f = open(BASE_ADDR+"import/"+module[type], "r")
        return f.read()
        
    # use to get machine learning component code
    def selector_ml(self, type:str) -> str:
        print("ml got:"+ type )
        module = {
            'lin-reg':'lin-reg.py'
        }
        f = open(BASE_ADDR+"ml/"+module[type], "r")
        return f.read()

    # use to get display component code
    def selector_display(self, type:str) -> str:
        print("display got:"+ type )
        module = {
            'dot-line':'dot-line.py'
        }
        f = open(BASE_ADDR+"display/"+module[type], "r")
        return f.read()

    # build a file
    def simple_build(self, components:List[Dict[str, str]]):
        
        heap = []
        heapq.heapify(heap)
        priority = 0
        
        for item in components:
            print(item)
            code = ''
            type = item['type']
            if type.startswith('import'):
                priority = 0
                code = self.selector_import(type.removeprefix('import-'))
            elif type.startswith('ml'):
                priority = 1
                code = self.selector_ml(type.removeprefix('ml-'))
            elif type.startswith('display'):
                priority = 2 
                code = self.selector_display(type.removeprefix('display-'))
            heapq.heappush(heap, (priority, code))
                
        output = ''
        while len(heap) > 0:
            _, code = heapq.heappop(heap)
            output += code + '\n'
        
        return output
            

    # returns useable code after analyzing the user request
    def run(self, input:dict)->str:
        if input['type'] == 'simple-build':
            return self.simple_build(input['components'])
        
        return ''

    # another way to call run
    def __call__(self, input:dict):
        cwd = os.getcwd()
        print(cwd)
        return self.run(input)
