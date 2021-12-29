import sys
import pythonencrypt as pe

key = 'TFG'
input = sys.stdin.readline()
#print("Python:")
decrypt = pe._decrypt(key,input)
#print(decrypt)
sys.stdout.write(decrypt)
sys.stdout.flush(decrypt)
