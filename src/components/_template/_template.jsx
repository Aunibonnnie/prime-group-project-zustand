import useStore from '../../zustand/store'

function _template () {
  const user = useStore((state) => state.user);
  
  return (
    <div>
      <h1>_template </h1>
    </div>
  );

}

export default _template