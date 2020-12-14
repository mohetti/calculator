# calculator

git stuff:
(git init) evtl zur Reinitilaisierung
git add README.md
git commit -m ""
git push -u origin main


# structure

eventlistener => Numbers
    result = ""                         ?                   secondWindow += innerText
                                                            string += "#"
    result != ""                        ?                   secondWindow = innerText
                                                            string = "" -> string = innerText
                                                            result = ""
    
eventlistener => Operators + * /
    secondWindow = ""                   ?                   return
    string index "#" != -1 ||
    string lastChar = "."               ?                   return
    string index "#" == -1              ?                   let operator = innerText
                                                            secondWindow += innerText
                                                            string += "#"

eventlistener => Operator -
    secondWindow = ""                   ?                   secondWindow = innerText
    string lastChar = Number AND
    string != "" AND
    string index "#" = -1               ?                   let operator = innerText
                                                            string += "#"
                                                            secondWindow += inerText
    string lastChar = #                 ?                   string += innerText
    string index "#" != -1 ||
    string lastChar = "."               ?                   return

equals Function
    operator = "" ||
    "#" index last Char in string       ?                   return

    a                                   =                   substring from string (0, indexOf("#"))
    b                                   =                   substring from string (indexOf("#") +1)
    based on operator                   =>                  invoke function mult, div, add, sub (a, b)
                                                            display result in secondWindow
                                                            string = secondWindow
                                                            result = defined
    firstWindow                         =                   secondWindow + "="
    operator                            =                   ""

clear Function
    operator                            =                   ""
    result                              =                   ""
    string                              =                   ""
    firstWindow                         =                   ""
    secondWindow                        =                   ""

del Function
    string last char != "#"             ?                   delete from string
                                                            delete from secondWindow
    string last char == "#"             ?                   delete from string
                                                            operator = ""
                                                            delete from secondWindow

decimal Function
    string = "" ||                                 
    string last Char = "#" ||
    string = "-"                            ?               return
    string != "" AND
    string index "#" = -1 AND
    string indexof "." = -1                 ?               string += innerText
                                                            secondWindow += innerText
    string index "#" = 1 AND
    string lastchar != "#" AND
    string substr (indexof(#) +1) != "."    ?               string += innerText
                                                            secondWindow += innerText   
