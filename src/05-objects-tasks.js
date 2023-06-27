/* ************************************************************************************************
 *                                                                                                *
 * Please read the following tutorial before implementing tasks:                                   *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object        *
 *                                                                                                *
 ************************************************************************************************ */


/**
 * Returns the rectangle object with width and height parameters and getArea() method
 *
 * @param {number} width
 * @param {number} height
 * @return {Object}
 *
 * @example
 *    const r = new Rectangle(10,20);
 *    console.log(r.width);       // => 10
 *    console.log(r.height);      // => 20
 *    console.log(r.getArea());   // => 200
 */

/* eslint-disable */

function Rectangle(width, height) {
  const obj = {
    width: width,
    height: height,
    getArea: function() {
      return this.width * this.height
    }
  }
  return obj;
}


/**
 * Returns the JSON representation of specified object
 *
 * @param {object} obj
 * @return {string}
 *
 * @example
 *    [1,2,3]   =>  '[1,2,3]'
 *    { width: 10, height : 20 } => '{"height":10,"width":20}'
 */
function getJSON(obj) {
  return JSON.stringify(obj);
}


/**
 * Returns the object of specified type from JSON representation
 *
 * @param {Object} proto
 * @param {string} json
 * @return {object}
 *
 * @example
 *    const r = fromJSON(Circle.prototype, '{"radius":10}');
 *
 */
function fromJSON(proto, json) {
  const help = JSON.parse(json);
  help.__proto__ = proto;
  return help;
}


/**
 * Css selectors builder
 *
 * Each complex selector can consists of type, id, class, attribute, pseudo-class
 * and pseudo-element selectors:
 *
 *    element#id.class[attr]:pseudoClass::pseudoElement
 *              \----/\----/\----------/
 *              Can be several occurrences
 *
 * All types of selectors can be combined using the combination ' ','+','~','>' .
 *
 * The task is to design a single class, independent classes or classes hierarchy
 * and implement the functionality to build the css selectors using the provided cssSelectorBuilder.
 * Each selector should have the stringify() method to output the string representation
 * according to css specification.
 *
 * Provided cssSelectorBuilder should be used as facade only to create your own classes,
 * for example the first method of cssSelectorBuilder can be like this:
 *   element: function(value) {
 *       return new MySuperBaseElementSelector(...)...
 *   },
 *
 * The design of class(es) is totally up to you, but try to make it as simple,
 * clear and readable as possible.
 *
 * @example
 *
 *  const builder = cssSelectorBuilder;
 *
 *  builder.id('main').class('container').class('editable').stringify()
 *    => '#main.container.editable'
 *
 *  builder.element('a').attr('href$=".png"').pseudoClass('focus').stringify()
 *    => 'a[href$=".png"]:focus'
 *
 *  builder.combine(
 *      builder.element('div').id('main').class('container').class('draggable'),
 *      '+',
 *      builder.combine(
 *          builder.element('table').id('data'),
 *          '~',
 *           builder.combine(
 *               builder.element('tr').pseudoClass('nth-of-type(even)'),
 *               ' ',
 *               builder.element('td').pseudoClass('nth-of-type(even)')
 *           )
 *      )
 *  ).stringify()
 *    => 'div#main.container.draggable + table#data ~ tr:nth-of-type(even)   td:nth-of-type(even)'
 *
 *  For more examples see unit tests.
 */

const cssSelectorBuilder = {
  order: ['', '', '', '', '', ''],
  element(val) {
    throw new Error('Not implemented');
    
    console.log(val);
    if (this.order[0] === '') {

      if (this.order.some((x, index) => {
        return index > 0 && x !== '';
      })) throw new Error("Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element");
      
      this.order[0] = val;
      return this;

    } else {

      throw new Error('Element, id and pseudo-element should not occur more then one time inside the selector');
    
    }
  },

  id(val) {
    throw new Error('Not implemented');

    if (this.order[1] === '') {

      if (this.order.some((x, index) => {
        return index > 1 && x !== '';
      })) throw new Error("Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element");

      this.order[1] = `#${val}`;
      return this;
    } else {
      throw new Error('Element, id and pseudo-element should not occur more then one time inside the selector');
    }
  },

  class(val) {
    throw new Error('Not implemented');

    if (this.order.some((x, index) => {
      return index > 2 && x !== '';
    })) throw new Error("Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element");

    this.order[2] += `.${val}`;
    return this;
  },

  attr(val) {
    throw new Error('Not implemented');

    if (this.order.some((x, index) => {
      return index > 3 && x !== '';
    })) throw new Error("Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element");

    this.order[3] += `[${val}]`;
    return this;

  },

  pseudoClass(val) {
    throw new Error('Not implemented');

    console.log(val);
    if (this.order.some((x, index) => {
      return index > 4 && x !== '';
    })) throw new Error("Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element");

    this.order[4] += `:${val}`;
    return this;

  },

  pseudoElement(val) {
    throw new Error('Not implemented');

    if (this.order[5] === '') {
      this.order[5] = `::${val}`;
      return this;
    } else {
      throw new Error('Element, id and pseudo-element should not occur more then one time inside the selector');
    }
  },

  combine(s1, comb, s2) {
    throw new Error('Not implemented');
    
    console.log(s1);
    console.log(comb);
    console.log(s2);
    return this;
    // return {
    //   this.str = `${s1.str} ${comb} ${s2.str}`,
    //   stringify() {
    //     return this.str;
    //   }
    // };
  },

  stringify() {
    const result = `${this.order[0]}${this.order[1]}${this.order[2]}${this.order[3]}${this.order[4]}${this.order[5]}`;
    this.order.fill('');
    return result;
  }
};


module.exports = {
  Rectangle,
  getJSON,
  fromJSON,
  cssSelectorBuilder,
};
