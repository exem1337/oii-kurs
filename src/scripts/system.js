export default function decide(form) {
  if (!form.creditGuearanteed) {
    console.log("2");
    return false;
  }
  if (form.livingInThisArea <= 5) {
    console.log("3");
    return false;
  }
  if (form.age < 20) {
    console.log("4");
    return false;
  }
  if (!form.hasHome) {
    if (form.hasBankAccount) {
      console.log("6");
      return true;
    } else {
      if (form.workPath > 10) {
        console.log("8");
        return true;
      } else if (form.workPlace > 3) {
        console.log("9");
        return false;
      } else {
        if (form.livingInThisArea > 29) {
          console.log("11");
          return false;
        } else {
          if (form.sex) {
            if (form.insurance) {
              console.log("14");
              return true;
            } else {
              if (form.insurancyAge < 9) {
                console.log("16");
                return false;
              } else {
                if (form.workPlace > 6) {
                  console.log("18");
                  return true;
                } else {
                  console.log("19");
                  return false;
                }
              }
            }
          } else {
            if (form.workPath < 7) {
              console.log("23");
              return true;
            } else {
              console.log("24");
              return false;
            }
          }
        }
      }
    }
  } else {
    if (form.age > 21) {
      if (form.workPath > 5) {
        console.log("31");
        return true;
      } else {
        if (form.sex) {
          if (form.hasBankAccount) {
            console.log("34");
            return true;
          } else {
            switch (form.moneyPaths) {
              case "Выплаты по исполнительным документам": {
                console.log("38");
                return false;
              }
              case "Выплаты по кредитам/займам": {
                console.log("40");
                return false;
              }
              case "Затраты на образование": {
                console.log("42");
                return true;
              }
              case "Иное": {
                console.log("44");
                return false;
              }
              case "Мобильная связь/интернет": {
                console.log("46");
                return true;
              }
              case "Одежда, продукты питания": {
                console.log("48");
                return false;
              }
              case "Оплата услуг (мед, юрид, и т.п)": {
                console.log("50");
                return false;
              }
              case "Покупка и ремонт недвижимости": {
                console.log("52");
                return true;
              }
              case "Покупка товаров длительного пользования": {
                console.log("54");
                return true;
              }
              case "Помощь родственникам": {
                console.log("56");
                return true;
              }
              case "Содержание/аренда недвижимости": {
                console.log("58");
                return false;
              }
              case "Турпоездки, развлечения": {
                console.log("60");
                return true;
              }
            }
          }
        } else {
          console.log("63");
          return true;
        }
      }
    } else {
      if (form.livingInThisArea > 10) {
        console.log("66");
        return true;
      } else {
        console.log("67");
        return false;
      }
    }
  }
}
