'use client'
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { employeeSchema, EmployeeSchema } from "@/validation/employee.valid";
import { employeeCreate } from "@/network/employee";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const EmployeeForm: React.FC = () => {
	const router = useRouter();
	const {
		register,
		handleSubmit,
		control,
		formState: { errors }
	} = useForm<EmployeeSchema>({
		resolver: zodResolver(employeeSchema),
		defaultValues: {
			status: 'Active',
			employmentType: 'Full-Time'
		}
	});

	const onSubmit = async (data: EmployeeSchema) => {
		const idToast = toast.loading('Loading...');
		const response = await employeeCreate(data)
		if (response) {
			toast.success("Employee created");
			router.push('/admin/employee');
		} else {
			toast.error("Employee Fail Crate");
		}
		toast.dismiss(idToast)

	};
	return (
		<div className="container mx-auto p-4">
			<form onSubmit={ handleSubmit(onSubmit) } className="space-y-4">
				<div className="form-control">
					<label className="label">
						<span className="label-text">Name</span>
					</label>
					<input
						type="text"
						{ ...register('name') }
						className={ `input input-bordered ${ errors.name ? 'input-error' : '' }` }
						placeholder="Employee Name"
					/>
					{ errors.name && <p className="text-error text-sm mt-1">{ errors.name.message }</p> }
				</div>

				<div className="form-control">
					<label className="label">
						<span className="label-text">Email</span>
					</label>
					<input
						type="email"
						{ ...register('email') }
						className={ `input input-bordered ${ errors.email ? 'input-error' : '' }` }
						placeholder="employee@company.com"
					/>
					{ errors.email && <p className="text-error text-sm mt-1">{ errors.email.message }</p> }
				</div>

				<div className="form-control">
					<label className="label">
						<span className="label-text">Phone</span>
					</label>
					<input
						type="tel"
						{ ...register('phone') }
						className="input input-bordered"
						placeholder="Phone Number"
					/>
				</div>

				<div className="form-control">
					<label className="label">
						<span className="label-text">Gender</span>
					</label>
					<Controller
						name="gender"
						control={ control }
						render={ ({ field }) => (
							<select
								{ ...field }
								className={ `select select-bordered ${ errors.gender ? 'select-error' : '' }` }
							>
								<option value="">Select Gender</option>
								<option value="Male">Male</option>
								<option value="Female">Female</option>
							</select>
						) }
					/>
					{ errors.gender && <p className="text-error text-sm mt-1">{ errors.gender.message }</p> }
				</div>

				<div className="form-control">
					<label className="label">
						<span className="label-text">Date of Birth</span>
					</label>
					<input
						type="date"
						{ ...register('dateOfBirth') }
						className="input input-bordered"
					/>
				</div>

				<div className="form-control">
					<label className="label">
						<span className="label-text">Hire Date</span>
					</label>
					<input
						type="date"
						{ ...register('hireDate') }
						className="input input-bordered"
					/>
				</div>

				<div className="form-control">
					<label className="label">
						<span className="label-text">Job Title</span>
					</label>
					<input
						type="text"
						{ ...register('jobTitle') }
						className={ `input input-bordered ${ errors.jobTitle ? 'input-error' : '' }` }
						placeholder="Job Title"
					/>
					{ errors.jobTitle && <p className="text-error text-sm mt-1">{ errors.jobTitle.message }</p> }
				</div>

				<div className="form-control">
					<label className="label">
						<span className="label-text">Department</span>
					</label>
					<input
						type="text"
						{ ...register('department') }
						className="input input-bordered"
						placeholder="Department"
					/>
				</div>

				<div className="form-control">
					<label className="label">
						<span className="label-text">Salary</span>
					</label>
					<input
						type="number"
						{ ...register('salary', { valueAsNumber: true }) }
						className={ `input input-bordered ${ errors.salary ? 'input-error' : '' }` }
						placeholder="Salary"
					/>
					{ errors.salary && <p className="text-error text-sm mt-1">{ errors.salary.message }</p> }
				</div>

				{/*<div className="form-control">*/ }
				{/*	<label className="label">*/ }
				{/*		<span className="label-text">Manager ID (Optional)</span>*/ }
				{/*	</label>*/ }
				{/*	<input*/ }
				{/*		type="number"*/ }
				{/*		{...register('managerId', { valueAsNumber: true })}*/ }
				{/*		className="input input-bordered"*/ }
				{/*		placeholder="Manager ID"*/ }
				{/*	/>*/ }
				{/*	{errors.salary && <p className="text-error text-sm mt-1">{errors.salary.message}</p>}*/ }
				{/*	*/ }
				{/*</div>*/ }


				<div className="form-control">
					<label className="label">
						<span className="label-text">Address</span>
					</label>
					<input
						type="text"
						{ ...register('address') }
						className="input input-bordered"
						placeholder="Street Address"
					/>
					{ errors.address && <p className="text-error text-sm mt-1">{ errors.address.message }</p> }

				</div>

				<div className="form-control">
					<label className="label">
						<span className="label-text">City</span>
					</label>
					<input
						type="text"
						{ ...register('city') }
						className="input input-bordered"
						placeholder="City"
					/>
					{ errors.city && <p className="text-error text-sm mt-1">{ errors.city.message }</p> }

				</div>

				<div className="form-control">
					<label className="label">
						<span className="label-text">Postal Code</span>
					</label>
					<input
						type="text"
						{ ...register('postalCode') }
						className="input input-bordered"
						placeholder="Postal Code"
					/>
					{ errors.postalCode && <p className="text-error text-sm mt-1">{ errors.postalCode.message }</p> }

				</div>

				<div className="form-control">
					<label className="label">
						<span className="label-text">Employment Type</span>
					</label>
					<select { ...register("employmentType") } className="select select-bordered">
						<option value="">Select Type</option>
						<option value="Full-Time">Full-Time</option>
						<option value="Part-Time">Part-Time</option>
					</select>
					{ errors.employmentType &&
											<p className="text-error text-sm mt-1">{ errors.employmentType.message }</p> }
				</div>

				<div className="form-control">
					<label className="label">
						<span className="label-text">Notes</span>
					</label>
					<textarea
						{ ...register('notes') }
						className="textarea textarea-bordered"
						placeholder="Additional notes"
					/>
					{ errors.notes && <p className="text-error text-sm mt-1">{ errors.notes.message }</p> }
				</div>

				<div className="form-control">
					<label className="label">
						<span className="label-text">Employee Image</span>
					</label>
					<input
						type="file"
						{ ...register('img') }
						className="file-input file-input-bordered w-full"
					/>
					{/* @ts-ignore */
						errors.img && <p className="text-error text-sm mt-1">{ errors.img.message }</p> }

				</div>

				<div className="form-control mt-6">
					<button
						type="submit"
						className="btn btn-primary"
					>
						Submit Employee
					</button>
				</div>
			</form>
		</div>
	);
};

export default EmployeeForm;