class CarsController < ApplicationController
    before_action :authorize

    def index
        user=User.find_by(id: session[:user_id])
        cars=user.cars
        render json: cars 
    end

    def create
        user=User.find_by(id: session[:user_id])
        make=Make.find_by(name: car_params[:carMake])
        if make
            car=user.cars.create({name: car_params[:name],make_id:make.id,year:car_params[:year]})
            render json: car
            else 
                render json: { error:"Make not found" },status: :not_found
            end
       
    end

    def show 
        user=User.find_by(id: session[:user_id])
        car=user.cars.find_by(id: params[:id])
        if car
        render json: car
        else 
            render json: { error:"Not found" },status: :not_found
        end

    end

    def update
        car=Car.find_by(id: params[:id])
        make=Make.find_by(name: car_params[:carMake])
        if car
            car.update({name: car_params[:name],make_id:make.id,year:car_params[:year]})
            render json: car, include: :make
            else 
                render json: { error:"Not found" },status: :not_found
            end
       

    end

    def destroy
        car=Car.find_by(id: params[:id])
        if car
            car.destroy
            head :no_content
            else 
                render json: { error:"Not found" },status: :not_found
            end
       
    end

    private

    def car_params
        params.permit(:name,:carMake,:year)
    end
    
    def authorize
        return render json: { error:"Not authorized" },status: :unauthorized unless session.include? :user_id
    end

end
