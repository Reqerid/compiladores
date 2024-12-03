datos_fa = []
datos_ce=[]
i=0

while True:
        
    entrada = input("Escribe el valor en grados Farenheit o 'salir' para terminar: ")
    if entrada =='salir':
        break
    else:
        try:
            
            numero=float(entrada)
            datos_fa.append(numero)
            centigrados =(datos_fa[i]-32)/1.8
            centigrados = round (centigrados,2)
            datos_ce.append(centigrados)

            i=i+1
        except:
            
            print ("ingresa un número valido o salir")

#imprimir
print("Grados Farenheit: ", datos_fa)
print ("Grados Centigrados: ", datos_ce)
