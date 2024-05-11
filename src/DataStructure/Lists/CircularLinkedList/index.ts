import { CircularLinkedList } from "./CircularLinkedList";

const employees = [
  {
    name: 'Фыва С. В.',
    salary: 5000,
    bonus: 500
  },
  {
    name: 'Попов Д. А.',
    salary: 50000,
    bonus: 5000
  },
  {
    name: 'Иванов Ю. Ф.',
    salary: 50000,
    bonus: 5000
  },
  {
    name: 'Антонов С. Д.',
    salary: 50000,
    bonus: 5000
  },
  {
    name: 'Сидоров В. К.',
    salary: 70000,
    bonus: 7000
  },
  {
    name: 'Крузенштерн И. В.',
    salary: 500000,
    bonus: 50000
  },
  {
    name: 'Фадеев В. В.',
    salary: 30000,
    bonus: 3000
  },
  {
    name: 'Бах И. А.',
    salary: 45000,
    bonus: 4500
  },
]

const list = CircularLinkedList.from(employees);
console.log('Перед упорядочиванием:\n')
console.table(list.toArray())

list.bubbleSort((e1, e2) => e1.name > e2.name);
console.log('\n\nПосле упорядочивания:\n')
console.table(list.toArray())

let totalSalaryWithBonus = 0
list.forEach(e => totalSalaryWithBonus += e.value.bonus + e.value.salary);

console.log('\n\nОбщая сумма денег: ', Intl.NumberFormat().format(totalSalaryWithBonus));
