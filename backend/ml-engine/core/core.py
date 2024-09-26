import subprocess

# ml engine core works with subprocess
class core:
    def simple_execute(self, code:str):     
        print('begin')
        r = subprocess.run(['python', '-c', code], capture_output=True, text=True)
        if r.returncode != 0 :
            raise Exception('output code: {}, error: {}'.format(r.returncode, r.stderr.__str__()))

    def __call__(self, input:str):
        self.simple_execute(input)
