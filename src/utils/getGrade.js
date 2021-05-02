const editDistance = (str1, str2, m, n, steps = {}) => {
  if (m === 0) return n
  if (n === 0) return m

  if (steps[`${m}-${n}`]) return steps[`${m}-${n}`]

  if (str1[m - 1] === str2[n - 1]) return editDistance(str1, str2, m - 1, n - 1, steps)

  steps[`${m}-${n}`] = 1 + Math.min(editDistance(str1, str2, m, n - 1, steps),
    editDistance(str1, str2, m - 1, n, steps),
    editDistance(str1, str2, m - 1, n - 1, steps))
  return steps[`${m}-${n}`]
}

export const getGrade = (lastWordCorrected, lastWordInput, lastWords) => {
  let nota = 0;
  for (let word in lastWords) {
    nota += (Math.min(parseInt(word) + 1), 4) * 10
  }

  nota -= editDistance(lastWordInput, lastWordCorrected, lastWordInput.length, lastWordCorrected.length)

  let comparation = []
  for (let index in lastWordCorrected) {
    if (lastWordCorrected[index] === lastWordInput[index]) comparation.push([lastWordInput[index], true])
    else comparation.push([lastWordInput[index], false])
  }

  return { nota: Math.max(0, nota), comparation }
}