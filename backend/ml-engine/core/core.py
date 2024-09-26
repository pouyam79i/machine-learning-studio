import subprocess

class core:

    def simple_execute(self, code:str):
        subprocess.run(['python', '-c', code], capture_output=True, text=True)

    def __call__(self, input:str):
        self.simple_execute(input)
