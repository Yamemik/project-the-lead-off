#1
_stack=[]

def push(x):
    _stack.append(x)
    
def pop():
    x=_stack.pop()
    return x

def clear():
    _stack.clear()
    
def size(_stack):
    return len(_stack)

def is_empty():
    return len(_stack)==0

for i in range(1,11):
    push(i)
print(_stack)
while not is_empty():
    print(pop())
clear()

#2
def is_correct(s: str):
    for char in s:
        if char in "([/":
            push(char)
        else:
            if is_empty():
                return False
            else:
                x = pop()
                if (x == "/"):
                    x_next = pop()
                    if(x!=x_next): return False
                    x = pop()    
                if x == "(" and char == "]" or x == "[" and char == ")":
                    return False
                
    return is_empty()

print(is_correct("[//((//))]"))
clear()

#3
strg = "(3+4 * (2−1))/5"

def isOperatorHighPriority(c):
    return c != '+' or c != '-' or c == '*' or c == '/',

for i in strg:
    if i == '(':
        if 
    if isOperatorHighPriority(i):
        x = i
    





















