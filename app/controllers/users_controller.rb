class UsersController < ApplicationController::API
    def index 
      users = User.all
      render json: users
    end
     def new
      user = User.new
    end

    def create
      user = User.new(user_params)
      if user.save  
        render json: {status: 'Success', message: 'Entry Complete'}, status: :ok
      else
        render json: {status: 'Error', message: 'Entry Not Complete'}, status: :unprocessable_entity
      end
    end
    
  
    def show
      user = User.find_by(id: params[:id])
      render json: {id: user.id, name_type: user.name_type}
    end

    def update
      render json: user.update(user_params)
    end

    def destroy
      render json: user.destroy
    end

   private

  
   def user_params
      params.require(:user).permit(:name_type)
    end
end
