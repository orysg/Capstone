import subprocess

def run_matlab_executable():
    try:
        result = subprocess.run(['./apply_generate_pic_to_datasets.exe', 'input.csv', 'output_directory'],
                                capture_output=True, text=True)
        print("Output:", result.stdout)
        print("Errors:", result.stderr)
    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    run_matlab_executable()
