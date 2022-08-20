let words = [
    'AGUA',
    'SOL',
    'RADIO',
    'TECLADO',
    'PUERTA'
]




const getWord = () => {
    const randomIndex = Math.floor((Math.random() * words.length))
    return words[randomIndex]
}

export default getWord