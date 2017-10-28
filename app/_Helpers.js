export const getFieldValues = (fields, requiredFields) => {
  var correct = {}
  var incorrect = {}

  requiredFields.map((el) => {
    var val
    if (fields[el].getWrappedInstance) {
      val = fields[el].getWrappedInstance().getValue()
    } else {
      val = fields[el].getValue()
    }
    if (!val) {
      incorrect[el] = 'field cannot be empty'
    } else {
      correct[el] = val
    }
  })

  return {incorrect, correct}
}
