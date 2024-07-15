import { z, ZodType } from 'zod';

export const schema: ZodType<any> = z.object({
	name: z.string().min(1, 'Nome é obrigatório'),
	birthDate: z.date().refine(date => {
			const today = new Date();
			return date <= today;
	}, {
			message: 'A data de nascimento deve ser anterior ou igual à data atual'
	}),
	appointmentDay: z.date().refine(date => {
			const minutes = date.getMinutes();
			const seconds = date.getSeconds();
			return minutes === 0 && seconds === 0;
	}, {
			message: 'Os agendamentos só podem ser feitos em horários exatos (ex: 11:00, 12:00)'
	}),
});