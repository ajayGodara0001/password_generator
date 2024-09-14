import { useCallback, useEffect, useRef, useState } from "react"

function App() {

  let [length, setlength] = useState(7)
  let [numAllow, setNumAllow] = useState(false)
  let [charAllow, setCharAllow] = useState(false)
  let [password, setPassword] = useState("")


  let passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numAllow) {
      str += "1234567890"
    }
    if (charAllow) {
      str += "!@#$&*?"
    }
    for (let i = 0; i < length; i++) {
      let ind = Math.floor(Math.random() * str.length)
      pass += str[ind]
    }

    setPassword(pass)
  }, [length, numAllow, charAllow, setPassword])

  const copyPasstoclipboard = useCallback(() => {
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0, 899)
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() => {
    passwordGenerator()
  }, [length, numAllow, charAllow, passwordGenerator])

  let passwordRef = useRef(null)

  return (
    <>
      <div className="w-full max-w-2xl bg-gray-600 mx-auto rounded-xl    text-center my-8 text-orange-400 py-5 px-4">
        <h1 className="text-white text-3xl py-3">Password Generetor</h1>
        <div className="flex rounded-lg overflow-hidden text-2xl">
          <input type="text"
            value={password}
            className="outline-none w-full px-3 py-1"
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <button
            className="bg-blue-800 px-3 outline-none py-2 "
            onClick={copyPasstoclipboard}
          >copy</button>
        </div>
        <div className="mt-6 flex justify-around text-3xl">
          <div>
            <input
              type="range"
              min={5}
              max={40}
              value={length}
              className="cursor-pointer"
              onChange={(e) => { setlength(e.target.value) }}
            />
            <label>Length({length})</label>
          </div>
          <div className="flex [&>*]:mx-3 ">
            <div>
              <input
                type="checkbox"
                defaultChecked={numAllow}
                onChange={() => setNumAllow((prev) => !prev)}
                id="num"
                className="w-7  h-5"
              />
              <label htmlFor="num">Number</label>
            </div>
            <div>
              <input
                type="checkbox"
                defaultChecked={charAllow}
                onChange={() => setCharAllow((prev) => !prev)}
                id="char"
                className="w-7  h-5"
              />
              <label htmlFor="char">Character</label>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
