function formatName(nameObj) {
  const { firstName, middleName, lastName } = nameObj;

  let name = `${firstName} ${lastName}`;
  if (middleName) name = `${firstName} ${middleName} ${lastName}`;
  
  return name;
}

export default formatName;
