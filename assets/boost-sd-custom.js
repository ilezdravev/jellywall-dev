/*********************** Custom JS for Boost AI Search & Discovery  ************************/
function formRequest(value) {
  return new Promise((resolve, reject) => {
      var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
      xhr.open("GET", Shopify.routes.root + 'products/'+ value +'?view=boost-sd-prod-price');
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.onload = () => resolve(xhr.responseText);
      xhr.onerror = () => reject(xhr.statusText);
      xhr.send();
  });
}
const customize = {
  callAjaxUpdateProductList: (componentRegistry) => {
    let preventReCallProductHandlesTheSame = [];
    const updateProductList = {
      name: 'ProductList - Shopify Ajax update',
      apply() {
        return {
          afterRender(element) {
            let productHandle = '';
            if (element.getParams().props && element.getParams().props.product) {
              productHandle = element.getParams().props.product.handle;
            }
            
            let requestReg = formRequest(productHandle);
            requestReg.then((res_success) => {
              let res = JSON.parse(res_success);
              let productItem = document.querySelector(`.boost-sd__product-item[data-product-id="`+ res.id +`"] `);
              productItem.querySelector('.boost-sd__product-price-content').innerHTML = res.price;
              // productItem.querySelector('.boost-sd__suggestion-queries-item-price').style.display = "block";
            }).catch((res_error) => {
              console.log(res_error)
            });
          },
        };
      },
    };
    // Register updateProductList When ProductList rendered
    componentRegistry.useComponentPlugin('ProductItem', updateProductList);
  },
  updateIsw: (componentRegistry) => {
    componentRegistry.useComponentPlugin('SearchProductItem', {
      name: 'Modify ISW',
      enabled: true,
      apply: () => ({
        afterRender(element) {
          const helpersRef = element.getHelpers();
          let productHandle = '';
          if (element.getParams().props && element.getParams().props.product) {
            productHandle = element.getParams().props.product.handle;
          }
          let requestReg = formRequest(productHandle);
          requestReg.then((res_success) => {
            let res = JSON.parse(res_success);
            let productItem = document.querySelector(`.boost-sd__instant-search-autocomplete .boost-sd__suggestion-queries-item[data-id="`+ res.id +`"] `);
            productItem.querySelector('.boost-sd__suggestion-queries-item-price').innerHTML = res.price;
            productItem.querySelector('.boost-sd__suggestion-queries-item-price').style.display = "block";
          }).catch((res_error) => {
            console.log(res_error)
          });
        }
      }),
    });
  },
  
  updateRecommendation: (registry) => {
    registry.useModulePlugin('RecommendationAPI', {
      name: 'Custom Recommendation - #188936',
      apply(builder) {
        builder.on('methodFulfilled', 'get', (result) => {
          let recommendationProducts = result.result.products;
          if(recommendationProducts.length > 0){
            for(let i = 0; i < recommendationProducts.length; i++){
              let requestReg = formRequest(recommendationProducts[i].handle);
              requestReg.then((res_success) => {
                let res = JSON.parse(res_success);
                let productItems = document.querySelectorAll(`.boost-sd__recommendation .boost-sd__product-item[data-product-id="`+ res.id +`"]`);
                productItems.forEach(function(el){
                  el.querySelector('.boost-sd__product-price').innerHTML = res.price;
                  el.querySelector('.boost-sd__product-price').style.display = "block";
                });
              }).catch((res_error) => {
                console.log(res_error)
              });
            }
          }
        });
      }
    });
  }
}
window.__BoostCustomization__ = (window.__BoostCustomization__ ?? []).concat([
  customize.callAjaxUpdateProductList,
  customize.updateIsw,
  customize.updateRecommendation
]);