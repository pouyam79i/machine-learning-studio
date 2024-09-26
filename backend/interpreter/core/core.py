import os
import json

BASE_ADDR = "./core/modules/"

class core():
    def __init__(self) -> None:
        pass
        
    # import code
    def import_code(self, addr):
        addr = BASE_ADDR + addr + '.py'
        f = open(addr, "r")
        return f.read()
             
    # build a file
    def simple_build(self, input:dict):
        
        functions = {
            'source': [],
            'inner': [],
            'target': [],
        }
        props = dict()
        
        user_hash = input['user_hash']
        data = input['data']
        data = json.loads(data)
        nodes = data['nodes']
        edges = data['edges']

        all_code = ''

        # import base code
        base_code = self.import_code('code_base')
        base_code = base_code.replace('USER_HASH', "\'" + user_hash + "\'")
        
        body_code = ''
        for node in nodes:
            
            # find node order
            node_code = node['tag'].split('/')
            if node_code[1] == 'import':
                functions['source'].append(node_code[-1] + "()")
            elif node_code[1] == 'ml':
                functions['inner'].append(node_code[-1] + "()")            
            elif node_code[1] == 'charts':
                functions['target'].append(node_code[-1] + "()")
                
            # set node props
            props[node['id']] = node['props'] 
            
            # import base code
            code = '\n' + self.import_code(node['tag']) + '\n'
            
            # set hashes
            code = code.replace('NODE_HASH', "\'" + node['id'] + "\'")
            source = ''
            target = ''
            for edge in edges:
                # this only works for one edge in between 2 nodes
                if edge['source'] == node['id']:
                    source = node['id']
                if edge['target'] == node['id']:
                    target = edge['source']
            code = code.replace('SOURCE_HASH', "\'" + source + "\'")
            code = code.replace('TARGET_HASH', "\'" + target + "\'")          
            body_code = body_code + code
            
            
        props_str = json.dumps(props)
        props_data = 'props = json.loads(\'' + props_str + '\')'
            
        all_code = base_code + '\n\n' + props_data + body_code + '\n\n'
        
        for func in functions['source']:
            all_code = all_code + func + '\n'
        for func in functions['inner']:
            all_code = all_code + func + '\n'
        for func in functions['target']:
            all_code = all_code + func + '\n'
            
        return all_code

    # returns useable code after analyzing the user request
    def run(self, input:dict)->str:
        return self.simple_build(input)


    # another way to call run
    def __call__(self, input:dict):
        cwd = os.getcwd()
        return self.run(input)
