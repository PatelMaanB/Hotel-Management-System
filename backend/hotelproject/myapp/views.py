from django.shortcuts import render
import json
from django.http import JsonResponse
from pymongo import MongoClient
import uuid
from datetime import datetime
from django.views.decorators.csrf import csrf_exempt


mongo_client = MongoClient("mongodb://localhost:27017/")
hotel_db = mongo_client.HotelDB
user_collection = hotel_db.userdata
rooms_collection=hotel_db.rooms


@csrf_exempt
def user_sign_up(request):
    if request.method == "POST":
       
        request_data = json.loads(request.body)
        user_email = request_data["emailAddress"]
        
        unique_user_id = str(uuid.uuid4())
        request_data["user_id"] = unique_user_id
        user_collection.insert_one(request_data)

        return JsonResponse(
            {
                "message": f"Welcome {user_email}",
                "user_id": request_data["user_id"],
                "success": True,
            },status=200,)
        
        
@csrf_exempt
def user_log_in(request):
    if request.method == "POST":
        
        request_data = json.loads(request.body)
        user_email = request_data.get("emailAddress")
        user_password = request_data.get("userPassword")

        found_user = user_collection.find_one({"emailAddress": user_email})

        if found_user is not None:
            if user_password != found_user["userPassword"]:
                return JsonResponse({"error": "Invalid password"}, status=401)
        else:
            return JsonResponse({"error": "No user found with this email!"}, status=404)

        return JsonResponse(
            {
                "message": f"Welcome {user_email}",
                "user_id": found_user["user_id"],
                "success": True,
            },status=200)


@csrf_exempt
def get_room_types(request):
    try:
        if request.method == "GET":
            rooms = list(rooms_collection.find({}, {'_id': 0}))
            return JsonResponse({"rooms": rooms}, status=200)
    except Exception as e:
        print(f"Error: {e}")
        return JsonResponse({"error": "Failed to fetch room types"}, status=500)
    
    
@csrf_exempt
def book_room(request):
    try:
        if request.method=="POST":
            data = json.loads(request.body)

            existing_customer = user_collection.find_one({"name": data['name']})

            if existing_customer:
                user_collection.update_one(
                    {"name": data['name']},  
                    {
                        "$set": {
                            "checkIn": datetime.strptime(data['checkIn'], '%Y-%m-%d'),
                            "checkOut": datetime.strptime(data['checkOut'], '%Y-%m-%d'),
                            "roomType": data['roomType'],
                            "price":data["price"],
                            "guests": int(data['guests']),
                            "updatedAt": datetime.now() 
                        }
                    }
                )
                return JsonResponse(
                    {
                        "message": f"Welcome { data['name']}",
                        "success": True,
                    },status=201)

    except Exception as e:
        print(f"Error: {e}")
        return JsonResponse({"error": "An error occurred during the booking process"}, status=401)


@csrf_exempt
def fetch_user_data(request):
    if request.method == 'POST':  
        try:
           
            data = json.loads(request.body)

            user_name = data.get('name')  

            user_data = user_collection.find_one({'name': user_name})

            if user_data:
                response_data = {
                    'name': user_data.get('name'),
                    'checkIn': user_data.get('check_in').strftime('%Y-%m-%d'),
                    'checkOut': user_data.get('check_out').strftime('%Y-%m-%d'),
                    'roomType': user_data.get('room_type'),
                    'price': user_data.get('price')
                }
                return JsonResponse(response_data, status=200)
            else:
                return JsonResponse({'error': 'Customer not found'}, status=404)
        except Exception as e:
            return JsonResponse({'error': 'error while geting user data'}, status=500)

@csrf_exempt
def store_final_price(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)

            user_name = data.get('name')
            final_price = data.get('finalprice')

            result = user_collection.update_one(
                {'name': user_name},
                {'$set': {'finalprice': final_price}}
            )

            if result.modified_count > 0:
                return JsonResponse({'message': 'Final price updated successfully!'}, status=200)
            else:
                return JsonResponse({'message': 'Customer not found or no changes made'}, status=404)
        except Exception as e:
            return JsonResponse({'error': 'error while updating final price'}, status=500)
