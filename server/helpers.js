// ref: https://github.com/strongloop/loopback/issues/651#issuecomment-167111395
const disableAllMethodsWithExceptions = function disableAllMethods(model, methodsToExpose) {
  if(model && model.sharedClass)
  {
    methodsToExpose = methodsToExpose || [];

    const modelName = model.sharedClass.name;
    const methods = model.sharedClass.methods();
    const relationMethods = [];
    const hiddenMethods = [];

    try
    {
      Object.keys(model.definition.settings.relations).forEach(function(relation)
      {
        console.log(modelName, relation);
        relationMethods.push({ name: 'prototype.__findById__' + relation });
        relationMethods.push({ name: 'prototype.__destroyById__' + relation });
        relationMethods.push({ name: 'prototype.__updateById__' + relation });
        relationMethods.push({ name: 'prototype.__exists__' + relation });
        relationMethods.push({ name: 'prototype.__link__' + relation });
        relationMethods.push({ name: 'prototype.__get__' + relation });
        relationMethods.push({ name: 'prototype.__create__' + relation });
        relationMethods.push({ name: 'prototype.__update__' + relation });
        relationMethods.push({ name: 'prototype.__destroy__' + relation });
        relationMethods.push({ name: 'prototype.__unlink__' + relation });
        relationMethods.push({ name: 'prototype.__count__' + relation });
        relationMethods.push({ name: 'prototype.__delete__' + relation });
      });
    } catch(err) {}

    methods.concat(relationMethods).forEach(function(method)
    {
      if(methodsToExpose.indexOf(method.name) < 0)
      {
        hiddenMethods.push(method.name);
        model.disableRemoteMethodByName(method.name);
      }
    });

    if(hiddenMethods.length > 0)
    {
      console.log('\nRemote methods hidden for', modelName, ':', hiddenMethods.join(', '), '\n');
    }
  }
};

module.exports = {
 disableAllMethodsWithExceptions
};
