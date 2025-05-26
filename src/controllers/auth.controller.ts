import { Request, Response } from 'express';
import { UserService } from '../services/user.service';

export class AuthController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Email and password are required'
                });
            }

            const result = await this.userService.login(email, password);
            
            return res.status(200).json({
                status: 'success',
                data: result
            });
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({
                    status: 'error',
                    message: error.message
                });
            }
            return res.status(500).json({
                status: 'error',
                message: 'Internal server error'
            });
        }
    }

    async register(req: Request, res: Response) {
        try {
            const result = await this.userService.create(req.body);
            
            return res.status(201).json({
                status: 'success',
                data: result
            });
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({
                    status: 'error',
                    message: error.message
                });
            }
            return res.status(500).json({
                status: 'error',
                message: 'Internal server error'
            });
        }
    }
} 