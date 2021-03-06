import Mixin              from 'ember-metal/mixin';
import { reads }          from 'ember-computed';
import { get }            from '@ember/object';
import { defineProperty } from '@ember/object';

export default Mixin.create({
  didReceiveAttrs() {
    this._super(...arguments);

    let options = get(this, 'componentProperties') || {};
    Object.keys(options).forEach((attributeName) => {
      if (typeof get(options, attributeName) === 'function') {
        defineProperty(this, attributeName, { value: get(options, attributeName) });
        return;
      }

      defineProperty(this, attributeName,
        reads(`componentProperties.${attributeName}`));
    });
  }
});