import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  name: string;
  email: string;
  education: string;
  Gender: "male" | "female";
};

export default function ReactHookForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>React Hook Form</h1>
      <input {...register("name", { required: true })} />
      {errors.name && <span>This field is required</span>}
      <input {...register("email", { required: true })} />
      {errors.email && <span>This field is required</span>}
      <input {...register("education", { required: true })} />
      <select {...register("Gender")}>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>

      <input type="submit" />
    </form>
  );
}
