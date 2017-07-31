* Overall I really like the structure of your components so far - but start looking for ways to break them up into smaller and smaller pieces. As you do this, you'll find there may be quite a few places you can DRY up your views significantly. For example, common form components can be abstracted into single `Input` and `Select` components. Doing this will make your components easier to read and more descriptive
* With `render` methods, make sure that any data that's kept constant is defined outside of the render. Any objects we define in a render are re-created every time the function is invoked, and components invoke their render methods fairly frequently. It's much more efficient **when practical** to define those objects outside of the render, so that we only ever have one place in memory set aside for that object.
* Watch out for consistency and structure with your reducer! A sub-reducer should only reduce one data type - don't be afraid to throw more fields onto state, even you just need something very simple. In fact, say that you have a couple fields where you just need to get a value from the server. Some folks even write "higher order reducers" that can create all of the boilerplate code you need.


```
const Input = (props) => {
  const {name, displayName, type, placeholder} = props

  return (
    <div className="form-group">
      <label htmlFor={name}>{displayName}</label>
      <input type={type} className="form-control" name={name} placeholder={placeholder} required />
    </div>
  )
}

<form>
  <Input name="email" displayName="Email" type="text" placeholder="Enter email" />
  <Input name="password" displayName="Email" type="text" placeholder="Enter email" />
  <Input name="address" displayName="Email" type="text" placeholder="Enter email" />
  <Input name="socialSecurity" displayName="Email" type="text" placeholder="Enter email" />
</form>
```

```
/client
  /components
    /management
      index.js
      ManageProduct.js
      ManageUser.js
    /products
    /orders
    /reviews

```
