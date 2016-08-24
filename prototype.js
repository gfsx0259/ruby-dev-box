<script>
//    function add(other, yet_another) {
//        return this.value + other + (yet_another || 0)
//    }
//
//    var one = { value: 1, add: add };
//    var two = { value: 2, add: add };
//
//    console.log(two.add(two.value));
//    console.log(add(two.value));
//    console.log(add.call(two, 2, 2) );
//
//    var bind_example = add.bind(one);
//
//    console.log(bind_example(2)); // this === one
//    // => 3

//
//    var person = Object.create(null);
//
//    function get_full_name() {
//        return this.first_name + ' ' + this.last_name
//    }
//
//    // (new_name:String) → undefined
//    // Sets the name components of the object, from a full name.
//    function set_full_name(new_name) {
//        var names;
//        names = new_name.trim().split(/\s+/);
//        this.first_name = names['0'] || '';
//        this.last_name  = names['1'] || '';
//    }
//
//    // Here we are reusing the previous getter/setter functions
//    Object.defineProperty(person, 'name', { get: get_full_name
//        , set: set_full_name
//        , configurable: true
//        , enumerable:   true })
//
//    // And adding the `greet' function
//    person.greet = function (person) {
//        return this.name + ': Why, hello there, ' + person + '.'
//    }
//
//
//    var mikhail = Object.create(person);
//    mikhail.first_name = 'Mikhail';
//    mikhail.last_name  = 'Weiß';
//    mikhail.age        = 19;
//    mikhail.gender     = 'Male';
//
//    console.log(mikhail.name);
//
//    mikhail.name = 'Michael White';
//
//    console.log(mikhail.first_name, mikhail.last_name);
//
//    console.log(mikhail.greet('you'));
//
//    console.log(Object.keys(mikhail));
//
//    person.greet = function(person) {
//        return this.name + ': Harro, ' + person + '.'
//    }
//
//    console.log(mikhail.greet('you'));
//
//mikhail.greet = function(person) {
//    return this.name + ': \'sup, ' + (person || 'dude')
//}
//
//    // And define our new protagonist, Kristin
//    var kristin = Object.create(person)
//    kristin.first_name = 'Kristin'
//    kristin.last_name  = 'Weiß'
//    kristin.age        = 19
//    kristin.gender     = 'Female'
//
//
//    // Greets the given person, sweetly
//    kristin.greet = function(person) {
//        return this.name + ': \'ello, ' + (person || 'sweetie')
//    }
//
//    console.log(mikhail.greet(kristin.first_name));




//var Claim = function(_super)
//{
//    function Claim()
//    {
//        console.log(4);
//
//        _super.apply(this, arguments);
//    }
//
//    Claim.prototype.hhh = function()
//    {
//        console.log('hhh');
//    };
//
//    return Claim;
//
//};

//var Claim_Production_Form_Fields_Client = (function(_super)
//{
//    function Claim_Production_Form_Fields_Client()
//    {
//       // _super.apply(this, arguments);
//    }
//
//   // Claim_Production_Form_Fields_Client.prototype = Object.create(_super.prototype);
//  //  Claim_Production_Form_Fields_Client.prototype.constructor = Claim_Production_Form_Fields_Client;
//
//    return Claim_Production_Form_Fields_Client;
//
//})(Claim);



//var Claim_Production_Form_Fields_Client = (function(){
//
//    console.log('arguments:');
//    console.log(arguments);
//
//    function Claim_Production_Form_Fields_Client()
//    {
//
//        // _super.apply(this, arguments);
//        console.log('here');
//    }
//    console.log('here1');
//})();

//var b = new Claim_Production_Form_Fields_Client;














// Функция хелпер для наследования объектов
function extendsClass (childClass, parentClass) {
    // Как упоминалось ранее, родитель (или [[Prototype]]) объекта определяется вызовом Object.create с первым аргументом, ссылающимся на объект-родитель.
    childClass.prototype = Object.create(parentClass.prototype);
    // Не могу сказать зачем это нужно
    childClass.prototype.constructor = childClass;
}

// Родительский класс
// Обёртка не обязательно, здесь не нужна
var Client_Abstract = new function(params){
    function Client_Abstract(){
        console.log('Конструктор базового класса');
        this.say = function(){
            alert('Привет из базового класса');
        }
    }
    Client_Abstract.prototype.age = function(){
        alert('Возраст не определён');
    };
    return Client_Abstract;
};

// Дочерний класс
// Обёртка нужна чтобы предустановить параметры перед созданием объекта,
// тоесть из этой обёртки мы вернём функцию с установленным свойством prototype, что позволит унаследовать переданный объект
var Client = (function(_super) {
    function Client(){
        console.log('Конструктор дочернего класса');

        // Устанавливает методы из базового конструктора (не из прототипа)
        _super.apply(this, arguments);


        this.say = function(){
            alert('Привет из дочернего класса');
        };

        this.age_param = 20;
        this.age = function(){
            alert('Возраст '+ this.age_param);
        };
    }

    extendsClass(Client, _super);


    // Добавляем свои прототайп методы
    Client.prototype.age = function(){
        alert('Возраст прототип клиент');
    };

    return Client;
})(Client_Abstract);


// Создаём объект дочернего класса
var clientObj = new Client;

console.log(clientObj);

clientObj.say();
clientObj.age();





</script>
