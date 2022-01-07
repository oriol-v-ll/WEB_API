import sys
import pythonencrypt as pe

key = 'TFG'
input = sys.stdin.readline()
decrypt = pe._decrypt(key,input)
sys.stdout.write(decrypt)
sys.stdout.flush(decrypt)
