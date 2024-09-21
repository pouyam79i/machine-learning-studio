import subprocess

class core:

    def simple_execute(self, code:str):
        try:
            subprocess.run(['python', '-c', code], capture_output=True, text=True)
            return True
        except:
            print('Exec Failed')
            return False
    
    def __call__(self, input:str):
        return self.simple_execute(input)
